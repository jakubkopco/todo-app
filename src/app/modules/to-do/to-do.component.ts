import {Component, OnInit} from '@angular/core';
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";
import {MatList, MatListItem} from "@angular/material/list";
import {ToDoListComponent} from "./components/to-do-list/to-do-list.component";
import {AuthService} from "../auth/services/auth.service";
import {MatDatepicker, MatDatepickerModule, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToDoItemModel} from "./models/toDoItem.model";
import {Router} from "@angular/router";
import {SupabaseService, UserModel} from "../../shared/services/supabase.service";
import {ToDoService} from "./services/to-do.service";
import {CommonModule} from "@angular/common";
import {Session} from "@supabase/supabase-js";
import {Subscriber} from "../../class/subscriber";
import {AppRoutes} from "../../app.routes";
import {CustomDialogService} from "../../shared/services/custom-dialog.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [
    MatFormField,
    MatToolbar,
    MatIcon,
    MatInput,
    MatIconButton,
    MatList,
    MatListItem,
    MatLabel,
    ToDoListComponent,
    MatHint,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss'
})
export class ToDoComponent extends Subscriber implements OnInit {
  toDoItems: ToDoItemModel[] = [];
  todoForm: FormGroup;
  user: UserModel| null = null;
  session: Session | null = this.supabase.session;

  constructor(readonly supabase: SupabaseService, private todoService: ToDoService, private formBuilder: FormBuilder,
              private router: Router, private auth: AuthService,
              private dialogService: CustomDialogService) {
    super();
    this.todoForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.minLength(1)]),
      date: new FormControl(undefined, [Validators.required, Validators.minLength(1)]),
      description: new FormControl('', [Validators.required, Validators.minLength(1)]),
      completed: new FormControl(false)
    })
  }

  async ngOnInit(): Promise<void> {
    this.supabase.authChanges((_, session) => {
      this.session = session
      if (session?.user) {
        this.user = {
          id: session?.user.id as string,
          email: session?.user.email as string
        };
        this.todoForm.addControl('owner', new FormControl(session?.user.id));
        this.subs.push(
          this.todoService.getAllToDoItems(session?.user.id).subscribe(items => {
            this.toDoItems = items.sort((a: ToDoItemModel, b: ToDoItemModel) => a.created_at < b.created_at ? -1 : 1);
          })
        );
      }
    });
  }

  addItem() {
    if (this.todoForm.valid && this.user?.id) {
      lastValueFrom(this.todoService.createToDoItem(this.todoForm.value)).then(res => {
        if (res.data) {
          this.toDoItems = [...this.toDoItems,
            {
              id: res.data[0].id,
              created_at: new Date(),
              owner: this.user?.id as string,
              title: this.todoForm.value.title,
              date: this.todoForm.value.date,
              description: this.todoForm.value.description,
              completed: this.todoForm.value.completed
            }
          ];
          this.todoForm.reset();
        }
      });
    } else {
      this.dialogService.openDialog({
        title: 'Error',
        message: 'Please fill in all fields'
      })
    }
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/', AppRoutes.Auth]);
    });
  }
}
