<template>
  <div>
    <v-container fluid class>
      <div>
        <v-card max-width="780" class="mx-auto my-auto elevation-14">
          <div class="card-bg" ref="content">
            <v-row class="ma-5 mb-0">
              <!-- Logo -->
              <v-col class="pt-0" cols="6" sm="6">
                <div style="height:100px">
                  <v-img
                    :src="imageURL"
                    height="100"
                    width="200"
                    class="mt-2"
                    aspect-ratio="1.4"
                    contain
                  ></v-img>
                </div>
                <v-btn
                  small
                  dark
                  tile
                  color="black"
                  class
                  @click="launchFilePicker()"
                  data-html2canvas-ignore="true"
                  raised
                >
                  <v-icon left>mdi-upload</v-icon>LOGO
                </v-btn>
                <input
                  type="file"
                  ref="file"
                  @change="onFileChange($event.target.files)"
                  style="display:none"
                />
              </v-col>
              <v-col align-self="center">
                    <v-row class="pr-3" justify="end" data-html2canvas-ignore="true">
                      <v-switch
                        v-model="invoice"
                        label="Quotation"
                        value="Invoice"
                        class="pl-6 mt-0"
                        hide-details="auto"
                        light
                        color="black"
                      ></v-switch>
                    </v-row>
                    <h1 v-if="invoice" class="black--text text--darken-2 pl-3 text-right">QUOTATION</h1>
                    <h1 v-else class="black--text text--darken-2 pl-3 text-right">INVOICE</h1>
              </v-col>
              <!-- Logo -->
            </v-row>
            <v-row class="ma-5 mt-0">
              <v-col cols="12" sm="5">
                <v-row>
                  <!-- Description -->
                  <v-col>
                    <h5 class="subtitle-1 font-weight-bold">Invoice from</h5>
                    <v-textarea rows="1" hide-details="auto"></v-textarea>
                  </v-col>
                  <!-- Description -->
                </v-row>
                <v-row>
                  <!-- Bill to -->
                  <v-col cols="12" sm="6">
                    <h5 class="subtitle-1 font-weight-bold">Bill to</h5>
                    <v-textarea rows="3" hide-details="auto"></v-textarea>
                  </v-col>
                  <!-- Bill to -->
                  <!-- Ship to -->
                  <v-col cols="12" sm="6">
                    <h5 class="subtitle-1 font-weight-bold">Ship to</h5>
                    <v-textarea rows="3" hide-details="auto"></v-textarea>
                  </v-col>
                  <!-- Ship to -->
                </v-row>
              </v-col>

              <v-col cols="12" sm="7">
                <!-- <h1 class="green--text text--darken-2">INVOICE</h1> -->
                <v-row>
                  <!-- Invoice Number -->
                  <v-col cols="12" class="pb-0 text-right">
                
                         <v-row>
                  <!-- Terms -->
                  <v-col cols="7" class="pb-0 pt-1">
                    <h5
                      class="black--text subtitle-1 font-weight-bold text-right right-input"
                    >Invoice No #</h5>
                  </v-col>
                  <v-col cols="5" class="pb-0 pt-0">
                    <v-text-field dense label class="right-input" hide-details="auto"></v-text-field>
                  </v-col>
                  <!-- Terms -->
                </v-row>
                    <!-- <h5
                      class="black--text subtitle-1 font-weight-bold text-right pt-2"
                    >Invoice No #123</h5> -->
                  </v-col>
                  <!-- Invoice Number -->
                </v-row>
                <v-row>
                  <!-- Issued Date -->
                  <v-col cols="7" class="pb-0">
                    <h5 class="black--text subtitle-1 font-weight-bold text-right pt-2">Date:</h5>
                  </v-col>
                  <v-col cols="5" class="pb-0">
                    <v-menu
                      v-model="menu1"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      hide-details="auto"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="date"
                          @blur="date = parseDate(dateFormatted)"
                          dense
                          class="right-input"
                          readonly
                          hide-details="auto"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" color="black" @input="menu1 = false"></v-date-picker>
                    </v-menu>
                  </v-col>
                  <!-- Issued Date -->
                </v-row>
                <v-row>
                  <!-- Terms -->
                  <v-col cols="7" class="pb-0 pt-1">
                    <h5
                      class="black--text subtitle-1 font-weight-bold text-right right-input"
                    >Payment Terms:</h5>
                  </v-col>
                  <v-col cols="5" class="pb-0 pt-0">
                    <v-text-field dense label class="right-input" hide-details="auto"></v-text-field>
                  </v-col>
                  <!-- Terms -->
                </v-row>
                <v-row>
                  <!-- Due Date -->
                  <v-col cols="7" class="pb-0 pt-0">
                    <h5 class="black--text subtitle-1 font-weight-bold text-right pt-2">Due Date:</h5>
                  </v-col>
                  <v-col cols="5" class="pb-0 pt-1">
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="dueDate"
                          @blur="dueDate = parseDate(dateFormatted)"
                          dense
                          class="right-input"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="dueDate" color="black" @input="menu2 = false"></v-date-picker>
                    </v-menu>
                  </v-col>
                  <!-- Due Date -->
                </v-row>
              </v-col>
            </v-row>
            <v-row class="ma-5">
              <v-col cols="12" xs="12">
                <!-- Table header -->
                <v-card color="black">
                  <v-row>
                    <v-col cols="6" class="pt-1 pb-1">
                      <h5 class="white--text subtitle-1 ml-2">Item</h5>
                    </v-col>
                    <v-col cols="2" class="pt-1 pb-1">
                      <h5 class="white--text subtitle-1">Quantity</h5>
                    </v-col>
                    <v-col cols="2" class="pt-1 pb-1">
                      <h5 class="white--text subtitle-1">Rate</h5>
                    </v-col>
                    <v-col cols="2" class="pt-1 pb-1">
                      <h5 class="white--text subtitle-1">Amount</h5>
                    </v-col>
                  </v-row>
                </v-card>
                <!-- Table header -->
                <v-row>
                  <!-- First three column -->
                  <v-col class="pt-1 pb-1" cols="10">
                    <v-row v-for="(data,index) in quatation" :key="index">
                      <v-col cols="7" class="pt-1 pb-1">
                        <v-text-field
                          solo
                          dense
                          hide-details="auto"
                          label="Description"
                          v-model="data.description"
                        ></v-text-field>
                        <v-divider class="mt-2 line-dark"></v-divider>
                      </v-col>
                      <v-col cols="2" class="ml-2 pt-1">
                        <v-text-field solo dense hide-details="auto" v-model="data.quantity"></v-text-field>
                      </v-col>
                      <v-col cols="2" class="ml-4 pt-1">
                        <v-text-field dense solo hide-details="auto" v-model="data.rate"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <!-- First three column -->
                  <!-- Last column -->
                  <v-col class="pt-1 pb-1" cols="2">
                    <v-row v-for="(data,index) in totalCount" :key="index" style="height:55px">
                      <v-col cols="12" class="pt-1 pb-1">
                        <h5 class="black--text subtitle-1 ma-2">{{data}}</h5>
                      </v-col>
                    </v-row>
                  </v-col>
                  <!-- Last column -->
                </v-row>
                <v-btn
                  dark
                  tile
                  color="black"
                  @click="addQuatation"
                  data-html2canvas-ignore="true"
                  raised
                >
                  <v-icon left>mdi-plus</v-icon>Add
                </v-btn>
              </v-col>
            </v-row>
            <v-row class="ma-5 pb-12">
              <v-col cols="7">
                <h5 class="black--text font-weight-bold subtitle-1">Notes</h5>
                <v-textarea rows="1" background-color="bg"></v-textarea>
                <h5 class="black--text font-weight-bold subtitle-1">Terms</h5>
                <v-textarea rows="1" background-color="bg" class="pb-3"></v-textarea>

                <v-img :src="signURL" max-height="100" max-width="300"></v-img>
                <h5 class="subtitle-1 font-weight-bold">Signature</h5>
                <v-row class="text-left">
                  <v-btn
                    small
                    dark
                    tile
                    color="black"
                    class="mb-12 mt-5 ml-4"
                    @click="launchFilePickerSign()"
                    data-html2canvas-ignore="true"
                    raised
                  >
                    <v-icon left>mdi-upload</v-icon>Sign
                  </v-btn>
                  <input
                    type="file"
                    ref="file2"
                    @change="onFileChangeSign($event.target.files)"
                    style="display:none"
                  />
                </v-row>
                <v-btn
                  dark
                  tile
                  color="black"
                  class="mb-12"
                  @click="download"
                  data-html2canvas-ignore="true"
                  raised
                >
                  <!-- <v-icon left>mdi-plus</v-icon>Add -->
                  Download
                </v-btn>
              </v-col>

              <v-col cols="5">
                <!-- Subtotal -->
                <v-row>
                  <v-col cols="6" class="pt-0 pb-0">
                    <h5 class="black--text subtitle-1 font-weight-bold text-right">Sub Total</h5>
                  </v-col>
                  <v-col cols="6" class="pt-0 pb-0">
                    <h5 class="subtitle-1 text-right bg">{{subTotal}}</h5>
                  </v-col>
                </v-row>
                <!-- Subtotal -->
                <!-- Tax -->
                <v-row>
                  <v-col cols="6" class="pt-0 pb-1">
                    <h5 class="black--text subtitle-1 font-weight-bold pt-2 text-right">Tax(%)</h5>
                  </v-col>
                  <v-col cols="6" class="pt-1 pb-1">
                    <v-text-field dense class="right-input" hide-details="auto" v-model="tax"></v-text-field>
                  </v-col>
                </v-row>
                <!-- Tax -->
                <!-- total -->
                <v-row>
                  <v-col cols="6" class="pt-0 pb-1">
                    <h5 class="black--text subtitle-1 font-weight-bold text-right">Total</h5>
                  </v-col>
                  <v-col cols="6" class="pt-0 pb-1">
                    <h5 class="subtitle-1 text-right bg">{{taxTotal}}</h5>
                  </v-col>
                </v-row>
                <!-- total -->
                <!-- Paid -->
                <v-row>
                  <v-col cols="6" class="pt-0 pb-1">
                    <h5 class="black--text subtitle-1 font-weight-bold text-right">Amount Paid</h5>
                  </v-col>
                  <v-col cols="6" class="pt-0 pb-1">
                    <v-text-field dense class="right-input" hide-details="auto" v-model="paid"></v-text-field>
                  </v-col>
                </v-row>
                <!-- paid -->
                <!-- Due balance -->
                <v-row class="mb-12 pb-12">
                  <v-col cols="6" class="pt-1">
                    <h5 class="black--text subtitle-1 font-weight-bold text-right">Balance Due</h5>
                  </v-col>
                  <v-col cols="6" class="pt-1 pb-12">
                    <h5 class="subtitle-1 text-right bg">{{balanceDue}}</h5>
                  </v-col>
                </v-row>
                <!-- Due balance -->
              </v-col>
            </v-row>
          </div>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      dueDate: new Date().toISOString().substr(0, 10),
      // dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
      description: "",
      quantity: "",
      rate: "",
      invoiceNum: "#",
      invoice: "",
      totalData: "",
      tax: "",
      imageURL: "",
      signURL: "",
      paid: "",
      quatation: [
        {
          description: "",
          quantity: "",
          rate: ""
        }
      ]
    };
  },
  computed: {
    totalCount() {
      var total = this.quatation.map(data => data.quantity * data.rate);
      return total;
    },
    subTotal() {
      var subCount = this.totalCount.reduce((a, b) => a + b, 0);
      return subCount;
    },
    taxTotal() {
      var tempTaxCount = (this.tax / 100) * this.subTotal;
      var taxCount = tempTaxCount + this.subTotal;
      return taxCount;
    },
    balanceDue() {
      var balanceAmount = this.taxTotal - this.paid;
      return balanceAmount;
    },
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    computedDateFormatted2() {
      return this.formatDate(this.dueDate);
    }
  },
  methods: {
    addQuatation() {
      this.quatation.push({
        description: "",
        quantity: "0",
        rate: "0"
      });
    },
    launchFilePicker() {
      this.$refs.file.click();
    },
    onFileChange(file) {
      let imageFile = file[0];
      this.imageURL = window.URL.createObjectURL(imageFile);
    },
    launchFilePickerSign() {
      this.$refs.file2.click();
    },
    onFileChangeSign(file) {
      let imageFile = file[0];
      this.signURL = window.URL.createObjectURL(imageFile);
    },
    download() {
      const doc = new jsPDF({ orientation: "portrait" });
      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();
      /** WITH CSS */
      var canvasElement = document.createElement("canvas");
      html2canvas(this.$refs.content, { canvas: canvasElement,scale:2.5 }).then(function(
        canvas
      ) {
        const img = canvas.toDataURL("image/jpg");
        doc.addImage(img, "jpg", 0, 0, width, height);
        doc.save("Invo.pdf");
      });
    }
  }
};
</script>

<style>
.card-bg {
  background: url(../assets/cardBg2.jpg) !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: 100% 100% !important;
}
.bg {
  background-color: #97aeb56b !important;
}
.v-divider.line-dark {
  max-width: none !important;
  width: 210% !important;
  height: 2px !important;
  border-color: #000000b0 !important;
}
.v-text-field {
  padding-top: 0px !important;
  margin-top: 0px !important;
}

.right-input input {
  text-align: right;
}
</style>