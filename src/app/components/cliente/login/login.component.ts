import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/_model/Cliente';
import { ClienteService } from 'src/app/_service/cliente.service';
import { ValidacionComponent } from '../../validacion/validacion.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private clienteService: ClienteService,
    private _snackBar: MatSnackBar,
    private router: Router) { 
    this.loginForm = this.createFormGroup();
  }

  ngOnInit(): void {
  }

  createFormGroup() {
    return new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required])
    });
  }

  errores() {
    let error: string[] = [];

    if(this.loginForm.controls.usuario.hasError('required')){
      error.push("Digite un usuario");
    }
    if(this.loginForm.controls.contrasena.hasError('required')){
      error.push("Digite una contraseña");
    }

    return error;
  }

  iniciarSesion(event: Event) {
    if(this.loginForm.valid) {
      const value = this.loginForm.value;
      let cliente = new Cliente();

      cliente.Usuario = value.usuario;
      cliente.Contrasena = value.contrasena;

      this.clienteService.postLogin(cliente).subscribe( data => {
        this.router.navigate(["servicio"]);
      }, err => {
        if (err.status == 400){
          this._snackBar.open('Usuario y/o contraseña incorrecta', 'Cerrar', {
            duration: 5000
          });
        }
      });
    } else {
      let error = this.errores();

      this._snackBar.openFromComponent(ValidacionComponent, {
        data: error,
        duration: 5000
      });
    }
  }

}
