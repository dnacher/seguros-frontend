import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';
import {BancoService} from '../../service/banco.service';


@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  bancoForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private fb: FormBuilder,
    private bancoService: BancoService,
    private dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService
  ) {
    this.bancoForm = this.fb.group({
      nombre: '',
      descripcion: '',
    });
  }

  ngOnInit(): void {
    this.bancoForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.bancoForm.valid) {
      if (this.data) {
        this.bancoService
          .updateBanco(this.data.id, this.bancoForm.value)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Banco Actualizado');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.bancoService.saveBanco(this.bancoForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Banco Agregado');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
