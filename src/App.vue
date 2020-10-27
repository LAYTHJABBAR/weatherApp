<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="Appointment ID:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.id"
          required
          placeholder="Enter the Appointment number"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-2"
        label="Email address:"
        label-for="input-2"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-2"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Your Name:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Appointment Time:" label-for="input-4">
     <div>
  
   
      <b-container >
  <b-row>
    <b-col sm="*"> <b-form-datepicker required id="example-datepicker" v-model="form.date" class="mb-16"></b-form-datepicker></b-col>
    <b-col sm="*"> <b-form-timepicker  v-model="form.time" show-seconds locale="en" class="mb-16"></b-form-timepicker></b-col>
  </b-row>
</b-container>
       
         
   
 
 
   
  </div>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          id: "",
          email: '',
          name: '',
          date: '',
          time:""
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true
      }
    },
    methods: {
         post: function(data) {
           if(this.form.name && this.form.date !=":" && this.form.time !=":" && this.form.email !="" && this.form.id !="")
      this.$http.post("http://localhost:3000/appointment", data);
    },
      onSubmit(evt) {
        evt.preventDefault()
        let data = JSON.stringify(this.form)
        this.post(data)
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
       this.form.date = ""
       this.form.time =""
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
    
  }
</script>