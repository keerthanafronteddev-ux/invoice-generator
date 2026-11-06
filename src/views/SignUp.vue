<template>
  <v-card  class="mx-auto my-auto px-8 py-8 elevation-9  card-width" width="400">
    <div class="display-1 text-center">
      <img src="../assets/logo.jpg" height="70" width="180">
      <h5>Invoice Generator</h5>
      </div>
    <v-text-field label="Enter  email address" v-model="emailId" rounded single-line class="pt-6" solo></v-text-field>
    <v-text-field label="Enter password" rounded v-model="password" type="password" single-line solo></v-text-field>
    <v-row>
        </v-row>
   <p v-if="errorMessage" class="body-2 text-center font-weight-bold red--text">Enter proper email ID and Password</p>
    <v-btn block color="secondary" class="mb-5 elevation-4" @click="signIn()" rounded dark>Sign Up</v-btn>
    <router-link to="/"><p dark class="text-center">Or Login to your account</p></router-link>
  </v-card>
</template>

<script>
import firebase from 'firebase'

export default {
data(){
    return{
        emailId:'',
        password:'',
        errorMessage:false
    }
},
methods:{
    signIn(){
        console.log(this.emailId,this.password);
        // firebase.auth().createUserWithEmailAndPassword
        firebase.auth().createUserWithEmailAndPassword(this.emailId, this.password)
        .then( user =>{
            console.log(user);
            this.$router.push('/')
        })
        .catch( err=>{
        this.errorMessage=true;
           console.log(err.message)
        
      })
        // e.preventDefault();
    }
}
}
</script>

<style>

</style>