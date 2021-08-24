import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TeacherEvalHttpService } from 'src/app/services/teacher-eval/teacher-eval-http.service';
import { HttpParams } from '@angular/common/http';
import { Paginator } from 'src/app/models/setting/paginator';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherEvalService } from 'src/app/services/teacher-eval/teacher-eval.service';
import { Preguntas } from 'src/app/models/teacher-eval/preguntas';
import { Question } from 'src/app/models/teacher-eval/question';
import { Evaluation } from 'src/app/models/teacher-eval/evaluation';
import { Teacher } from 'src/app/models/app/teacher';
import { EvaluationType } from 'src/app/models/teacher-eval/evaluation-type';
import { SchoolPeriod } from 'src/app/models/app/school-period';
import { Status } from 'src/app/models/app/status';
import { ConfirmationService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  providers: [MessageService]
})

export class QuestionComponent implements OnInit {
  formQuestion: FormGroup;
  paginator: Paginator;
  questions: Question[];
  evaluations: Evaluation;
  docente: Teacher;
  evaluationType: EvaluationType;
  schoolPeriod: SchoolPeriod;
  status: Status;
  id: string;

  selectedValue: string = 'val1';

  constructor(private messageService: MessageService,
    private formBuilder: FormBuilder,
    private teacherEvalService: TeacherEvalService,
    private teacherEvalHttpService: TeacherEvalHttpService,
    private confirmationService: ConfirmationService,
    private activeRouter: ActivatedRoute,

  ) {
    this.paginator = { current_page: 1, per_page: 2 };
    this.questions = [];

  }
  city: string;
  selectedCategory: any = null;
  evaluacion: any[] = [
    { name: '1', key: this.getRandom(), checked: true },
    { name: '2', key: this.getRandom(), checked: false },
    { name: '3', key: this.getRandom(), checked: false },
    { name: '4', key: this.getRandom(), checked: false }];


  pregunta: any[];

  modelo: Preguntas[] = [];


  buildFormQuestion() {
    this.formQuestion = this.formBuilder.group({
      type: [null],
      status: [null],
      code: [null, Validators.required],
      order: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  get typeField() {
    return this.formQuestion.get('type');
  }
  get statusField() {
    return this.formQuestion.get('type');
  }
  get cpdeField() {
    return this.formQuestion.get('type');
  }
  get orderField() {
    return this.formQuestion.get('type');
  }
  get nameField() {
    return this.formQuestion.get('type');
  }
  get descriptionField() {
    return this.formQuestion.get('type');
  }


  getQuestions(paginator: Paginator) {
    const params = new HttpParams()
      .append('page', paginator.current_page.toString())
      .append('per_page', paginator.per_page.toString());

    this.teacherEvalHttpService.get('questions').subscribe(
      response => {
        this.questions = response['data'];
        this.paginator = response as Paginator;

      }, error => {

      }
    )
  }


  ngOnInit() {
    this.buildFormQuestion();
    this.onTestWebService();
    this.selectedCategory = this.evaluacion[1];
    this.activeRouter.params.subscribe(
      params => {
        this.id = params['id'];
        console.log(this.id);
      });
  }


  //para traer las preguntas
  onTestWebService() {
    this.teacherEvalService.getInit(1).subscribe(result => {
      this.pregunta = result.data;
      console.log(result);
      console.log(this.pregunta);

      this.getInicializarModelo();
      console.log(this.modelo);

    });
  }

  getRandom() {
    return Math.random();
  }

  //para que el radio button sea equivalente a las preguntas que haya
  getInicializarModelo() {
    let i: number = 0;
    while (this.pregunta.length > i) {
      let inicializador: Preguntas = new Preguntas();
      // inicializador.valor=1;
      this.modelo.push(inicializador);
      i++;
    }
  }

  //para que el radiobutton sea dinamico y no se marque todos al mismo tiempo segun la pregunta
  getCheckSelect() {
    let isValidateRadio = true;
    let puntajeMaximo: number = 96;
    let porcentajeEvaluacion: number = 0;


    for (const iterator of this.modelo) {
      if (iterator.valor) {
        porcentajeEvaluacion += +iterator.valor * 100 / puntajeMaximo;
        iterator.isValidate = true;

      } else {
        iterator.isValidate = false;
        isValidateRadio = false;
      }

    }
    console.log("resultado de la regla de 3 =", porcentajeEvaluacion);


    
    this.evaluationType = {
      id: 6
    }

    this.schoolPeriod = {
      id: 1
    }

    this.status = {
      id: 1
    }

    this.evaluations = {
      id: 1,
      result: porcentajeEvaluacion,
      percentage: 0.35,
    }

    let dataSave = {
      
      evaluation_type: this.evaluationType,
      shoolPeriod: this.schoolPeriod,
      status: this.status,
      evaluation: this.evaluations
    }
    console.log(dataSave);
    console.log(this.modelo);

    if (isValidateRadio) {
      this.teacherEvalService.postEvaluationAdd(this.id, dataSave).subscribe(result => {
        console.log(result);
        this.showSuccess();

      }, error => {
        console.log(error);
        

      });
    } else{
      this.showError();
    }

  }

  confirm() {
    this.confirmationService.confirm({
      message: '¿Estas seguro de guardar la evaluación?. Sus datos ya no podrán ser modificados',
      accept: () => {
      }
    });
  }

  validateModal(value) {
    for (let i = 0; i < this.modelo.length; i++) {
      if (value == i) {

        return this.modelo[i].isValidate;
      }
    }
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Datos Guardados ', detail: 'La Evaluación ha sido registrada correctamente' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error ', detail: 'Todos los datos son obligatorios' });
  }





























}








