<script lang="ts">
import axios from "axios";
import Book from "@/models/Book";
import * as toast from "@/config/toast";

export default {
  inheritAttrs: false,

  data() {
    return {
      loading: false,
      formTitle: "",
      formDescription: "",
      formImage: null,
      formPdf: null,
      apiFailed: false,
    };
  },
  created() {},
  methods: {
    selectImage(event: any) {
      console.log(event.target.files);
      this.formImage = event.target.files[0];
    },
    selectPdf(event: any) {
      console.log(event.target.files[0]);
      this.formPdf = event.target.files[0];
    },
    async uploadBook() {
      let formData: Object = new FormData();
      formData = {
        title: this.formTitle,
        description: this.formDescription,
        image: this.formImage,
        book: this.formPdf,
      };
      try {
        this.loading = true;
        const response = await axios.post(
          "http://127.0.0.1:8000/api/create_book",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.success) {
          toast.showToast("success", response.data.message);
        } else {
          toast.showToast("error", response.data.message);
        }
        this.formTitle = "";
        this.formDescription = "";
        this.formImage = null;
        this.formPdf = null;
      } catch (e: any) {
        this.apiFailed = true;
        const errors: any = Object.values(e.response.data.message).flat(1);
        let errorString: String = "";
        errors.forEach((item: String) => {
          errorString += item + "\n";
        });
        toast.showToast("error", errorString);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="wrapper-bodySection">
      <h1>Upload Books</h1>
      <div class="wrapper-bodySection-border">
        <div class="p-3">
          <label>TITLE</label
          ><input
            type="text"
            v-model="formTitle"
            placeholder="title"
            class="inputText"
          />
          <label>DESCRIPTION</label
          ><input
            type="text"
            v-model="formDescription"
            placeholder="description"
            class="inputText"
          />
          <label>IMAGE</label><br />
          <input
            type="file"
            @change="selectImage"
            accept="image/png, image/jpg, image/jpeg"
          /><br /><br />
          <label>PDF</label><br />
          <input type="file" @change="selectPdf" accept="application/pdf" />
          <div class="float-end">
            <br />
            <button
              :disabled="loading"
              class="btn btn-success"
              type="submit"
              @click="uploadBook"
            >
              <span v-if="loading">Loading</span>
              <span v-else>Upload</span>
            </button>
          </div>
          <!-- <p>hi</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  background-color: aliceblue;
}
.wrapper-bodySection {
  background-color: white;
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.2rem;
  min-height: 100%;
}

h1 {
  color: black;
  font-size: 1.5rem;
}
.wrapper-bodySection-border {
  height: 1px;
  background-color: lightgrey;
  margin: 1rem 0rem;
}
.inputText {
  padding: 0.2rem;
  border: 1px solid lightgray;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 5px;
}

.inputText::placeholder {
  color: lightgrey;
}
</style>
