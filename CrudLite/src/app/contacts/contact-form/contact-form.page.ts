import { Component, OnInit } from '@angular/core';
import { Contact } from '../shared/contact';
import { ContactService } from '../shared/contact.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.page.html',
  styleUrls: ['./contact-form.page.scss'],
})
export class ContactFormPage implements OnInit {
  title: string = "Novo Contato";
  contact: Contact;

  constructor(private contactService: ContactService,private route: ActivatedRoute, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.contact = new Contact();
    const idParam = this.route.snapshot.paramMap.get('id');
    if(idParam){
      this.title = 'Editar Contato';
      this.loadContact(parseInt(idParam));
    }
  }

  async loadContact(id: number){
    this.contact = await this.contactService.getById(id);
  }

  async onSubmit(){
    try {
      const result = await this.contactService.save(this.contact);
      this.contact.id = result.insertId;
      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Contato salvo com sucesso',
        color: 'sucess',
        position: 'bottom',
        duration: 3000
      });
      toast.present();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao salvar o Contato!',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });
      toast.present();
    }
  }

}
