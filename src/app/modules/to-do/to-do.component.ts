import {Component, OnInit} from '@angular/core';
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";
import {MatList, MatListItem} from "@angular/material/list";
import {ToDoListComponent} from "./components/to-do-list/to-do-list.component";
import {MatDatepicker, MatDatepickerModule, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToDoItemModel} from "./models/to-do-item.model";
import {SupabaseService, UserModel} from "../../shared/services/supabase.service";
import {ToDoService} from "./services/to-do.service";
import {CommonModule} from "@angular/common";
import {CustomDialogService} from "../../shared/services/custom-dialog.service";
import {lastValueFrom} from "rxjs";
import {ToDoToolbarComponent} from "./components/to-do-toolbar/to-do-toolbar.component";
import {AlphanumericOnlyDirective} from "../../shared/directives/alphanumeric-only.directive";

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [
    MatFormField,
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
    CommonModule,
    ToDoToolbarComponent,
    AlphanumericOnlyDirective
  ],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss'
})
export class ToDoComponent implements OnInit {
  toDoItems: ToDoItemModel[] = [];
  readonly todoForm: FormGroup;
  user: UserModel | null = null;

  constructor(readonly supabase: SupabaseService,
              private todoService: ToDoService,
              private formBuilder: FormBuilder,
              private dialogService: CustomDialogService) {
    this.todoForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.minLength(1)]),
      date: new FormControl(undefined, [Validators.required, Validators.minLength(1)]),
      description: new FormControl('', [Validators.required, Validators.minLength(1)]),
      completed: new FormControl(false)
    })
  }

  async ngOnInit(): Promise<void> {
    this.supabase.authChanges((_, session) => {
      if (session?.user) {
        this.user = {
          id: session?.user.id as string,
          email: session?.user.email as string
        };
        this.todoForm.addControl('owner', new FormControl(session?.user.id));
        lastValueFrom(this.todoService.getAllToDoItems(session?.user.id)).then(items => {
          this.toDoItems = this.todoService.getSortedToDoItems(items);
        });
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
}
