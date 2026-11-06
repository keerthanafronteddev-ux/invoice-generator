<template>
<v-container fill-height>
  <v-card  class="mx-auto my-auto px-8 py-8 elevation-9  card-width" width="400">
    <div class="display-1 text-center">
      <img src="../assets/logo.jpg" height="70" width="180">
      <h5>Invoice Generator</h5>
      </div>
    <v-text-field label="Enter  email address" v-model="emailId" rounded single-line class="pt-6" solo></v-text-field>
    
    <v-row>
        </v-row>
   <p v-if="errorMessage" class="body-2 text-center font-weight-bold red--text">Enter proper email ID</p>
    <v-btn block color="secondary" class="mb-5 elevation-4" @click="forgetPassword()" rounded dark>Reset Password</v-btn>
    <router-link to="/"><p dark class="text-center">Or Login to your account</p></router-link>
  </v-card>
  <v-dialog

      v-model="dialog"
      max-width="470"
    >
      <v-card class="text-center pa-5"> 
           <v-icon x-large color='green' class="display-4">mdi-checkbox-marked-circle-outline</v-icon>
        <v-card-title class="title">Password Reset link is sent to registered email address</v-card-title>
        <router-link to="/"> <v-btn  color="secondary" class="mb-5 elevation-4 ma-5" rounded dark @click="dialog = false">Ok</v-btn></router-link>
      </v-card>
      
    </v-dialog>
</v-container>
</template>

<script>
import firebase from 'firebase'
export default {
    data(){
        return{
            emailId:'',
            errorMessage:false,
            dialog:false
        }
    },
    methods:{
        forgetPassword(){
            firebase.auth().sendPasswordResetEmail(this.emailId).then(() =>{
               
                this.dialog= true;
        
            })
            .catch((err) =>{
                this.errorMessage=true;
                console.log(err);
            })
        }
    }

}
</script>

<style>

</style>