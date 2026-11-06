import Vue from "vue";
import VueRouter from "vue-router";
import Invoice from "../views/Invoice";
import Login from "../views/Login";
import SignUp from "../views/SignUp";
import ForgetPassword from "../views/ForgetPassword";
import firebase from 'firebase'


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/SignUp",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/ForgetPassword",
    name: "ForgetPassword",
    component: ForgetPassword
  },
  {
    path: "/invoice",
    name: "Invoice",
    component: Invoice,
    meta:{
      requireAuth:true
    }
  }
];



const router = new VueRouter({
  mode:'history',
  routes
});

router.beforeEach((to,from,next)=>{
  if(to.matched.some(rec => rec.meta.requireAuth)){
    let user = firebase.auth().currentUser
    if(user){
      next()
    }else{
      next({name:'Login'})
    }
  }else{
    next()
  }
})
export default router;
