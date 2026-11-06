<template>
  <v-card  class="mx-auto my-auto px-8 py-8 elevation-9  card-width" width="400">
    <div class="display-1 text-center">
      <img src="../assets/logo.jpg" height="70" width="180">
      <h5>Invoice Generator</h5>
      </div>
    <v-text-field label="Enter email address" v-model="emailId" rounded single-line class="pt-6" solo></v-text-field>
    <v-text-field label="Enter password" rounded v-model="password" type="password" single-line solo></v-text-field>
    <v-row>
        <!-- <v-col cols="6">  <v-switch v-model="toggle" class="mt-0 black--text" c></v-switch></v-col> -->
        <!-- <v-col cols="6"><p class="body-2 text-right black--text mt-1">Forgot Password</p></v-col> -->
        </v-row>
   <p v-if="errorMessage" class="body-2 text-center font-weight-bold red--text">Incorrect email or password</p>
   <v-btn block color="secondary" class="mb-5 elevation-4" @click="logIn()" rounded dark>Login</v-btn>
     <router-link to="/SignUp"><v-btn block color="secondary" class="mb-5 elevation-4" rounded outlined dark>sign up</v-btn></router-link>
      <router-link to="/ForgetPassword"><p dark class="text-center">Or Forgot Password</p></router-link>
    <!-- <p class="body-2 text-center black--text">Don't have account ? <a class="primary--text"> <router-link to="/SignUp">Sign Up</router-link></a></p> -->
  </v-card>
</template>

<script>
import firebase from 'firebase'
export default {
  
  data(){
    return{
      emailId:'',
      password:'',
      errorMessage:false,
    }
  },
  methods:{
    logIn(){
      firebase.auth().signInWithEmailAndPassword(this.emailId,this.password)
      .then(cred =>{
        console.log(cred.user);
        this.$router.push('/invoice')
      })
      .catch( err=>{
        this.errorMessage=true;
        console.log(err.message)
      })
    }
  }

}
</script>

<style>
.v-application a {
    cursor: pointer;
    text-decoration: none;
}
</style>