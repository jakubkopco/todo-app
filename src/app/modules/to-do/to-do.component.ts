import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFabButton } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatList, MatListItem } from '@angular/material/list';

import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { ToDoToolbarComponent } from './components/to-do-toolbar/to-do-toolbar.component';
import { ToDoItemForm } from './models/to-do-item.model';
import { ToDoItemsStore } from './to-do.store';
import { AlphanumericOnlyDirective } from '../../shared/directives/alphanumeric-only.directive';
import { CustomDialogService } from '../../shared/services/custom-dialog.service';

interface ToDoForm {
  title: FormControl<string | null>;
  date: FormControl<Date | null>;
  description: FormControl<string | null>;
}

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatInput,
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
    AlphanumericOnlyDirective,
    MatFabButton
  ],
  providers: [ToDoItemsStore],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss'
})
export class ToDoComponent {
  readonly todoForm: FormGroup<ToDoForm>;
  readonly store = inject(ToDoItemsStore);

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly dialogService: CustomDialogService
  ) {
    this.todoForm = this.formBuilder.group<ToDoForm>({
      title: new FormControl('', [Validators.required, Validators.minLength(1)]),
      date: new FormControl(null, [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
  }

  async addItem(formGroupDirective: FormGroupDirective): Promise<void> {
    if (this.todoForm.valid && this.isToDoItemForm(this.todoForm.value)) {
      try {
        await this.store.createToDoItem(this.todoForm.value);
        this.todoForm.reset();
        formGroupDirective.resetForm();
      } catch (e) {
        console.error(e);
      }
    } else {
      this.dialogService.openDialog({
        title: 'Error',
        message: 'Please fill in all fields'
      });
    }
  }

  private isToDoItemForm(obj: typeof this.todoForm.value): obj is ToDoItemForm {
    return Object.values(obj).every(value => !!value);
  }
}
