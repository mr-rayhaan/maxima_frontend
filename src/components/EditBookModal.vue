<script>
import axios from "axios";
import * as toast from "@/config/toast";
export default {
  props: ["selectedBookEdit", "showEditModal"],

  inheritAttrs: false,
  mounted() {
    this.values = { ...this.selectedBookEdit };
  },
  data() {
    return {
      loading: false,
      formTitle: "",
      formDescription: "",
      formImage: null,
      formPdf: null,
    };
  },
  methods: {
    closeModalButton() {
      console.log("closeModal");
      this.$emit("close-modal");
    },
    async updateDetails() {
      // this.loading = true
    },
    closeModal(event) {
      console.log("Edit modal clicked", event);
      if (
        event.target.classList.value === "vue-modal" ||
        event.target.classList.value ===
          "vue-modal fade-enter-active fade-enter-to"
      ) {
        this.$emit("close-modal");
      }
    },
    selectImage(event) {
      console.log(event.target.files);
      this.formImage = event.target.files[0];
    },
    selectPdf(event) {
      console.log(event.target.files[0]);
      this.formPdf = event.target.files[0];
    },
    async updateBook() {
      let formData = new FormData();
      formData = {
        id: this.selectedBookEdit.id,
        title: this.formTitle,
        description: this.formDescription,
        image: this.formImage,
        book: this.formPdf,
      };
      try {
        this.loading = true;
        const response = await axios.post(
          "http://127.0.0.1:8000/api/update_book",
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
        this.closeModalButton();
        this.$emit("confirmed-edit", response.data.book);
      } catch (e) {
        console.log(e.response.data.message);
        this.apiFailed = true;
        let errorString = "";
        if (typeof e.response.data.message !== String) { 
          const errors = Object.values(e.response.data.message).flat(1);
          errors.forEach((item) => {
            errorString += item + "\n";
          });
        } else { 
          errorString = e.response.data.message;
        } 

        toast.showToast("error", errorString);
      } finally {
        this.loading = false;
      }
    },
  },
  watch: {
    selectedBookEdit(value) {
      console.log("selectedVideoEdit", value);
      if (value !== null) {
        this.formTitle = value.title;
        this.formDescription = value.description;
      }
    },
    formTitle(value) {
      console.log(value);
    },
  },
};
</script>

<template>
  <transition name="fade">
    <div v-show="showEditModal" class="vue-modal" @click="closeModal">
      <transition name="drop-in" v-show="showEditModal">
        <div class="vue-modal-inner">
          <div class="vue-modal-content">
            <div
              class="d-flex justify-content-between border-bottom border-light p-3"
            >
              <div>
                <h5>Edit Book</h5>
              </div>
              <div>
                <i class="fa fa-times fa-lg pointer" @click="closeModal"></i>
              </div>
            </div>
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
                  @click="updateBook"
                >
                  <span v-if="loading">Loading</span>
                  <span v-else>Update</span>
                </button>
              </div>
              <!-- <p>hi</p> -->
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style>
@media only screen and (min-width: 700px) {
  /* CSS that should be displayed if width is equal to or greater than 700px goes here */
  .vue-modal-inner {
    max-width: 50%;
  }
}

@media only screen and (min-width: 1200px) {
  #upload_video_icon,
  #sort_videos_icon {
    display: none !important;
  }
}

@media only screen and (max-width: 400px) {
  /* CSS that should be displayed if width is equal to or less than 400px goes here */
  .vue-modal-inner {
    max-width: 100%;
  }
}

::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.vue-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}

.vue-modal-inner {
  margin: 2rem auto;
}

.vue-modal-content {
  position: relative;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  background-clip: padding-box;
  border-radius: 0.3rem;
  padding: 1rem 1rem 2rem 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.drop-in-enter-active,
.drop-in-leave-active {
  transition: all 0.3s ease-out;
}

.drop-in-enter-from,
.drop-in-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}

.pointer {
  cursor: pointer;
}
</style>
<style scoped>
.modalCaption {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid grey;
  padding: 10px;
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
