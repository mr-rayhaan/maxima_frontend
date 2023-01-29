<script>
import axios from "axios";
import * as toast from "@/config/toast";
export default {
  props: ["selectedBookDelete", "showDeleteModal"],

  mounted() {
    this.values = { ...this.selectedBookDelete };
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    closeModal() {
      console.log("closeModal");
      this.$emit("close-modal");
    },
    async deleteBook() {
      let formData = new FormData();
      formData = {
        id: this.values.id,
      };
      try {
        this.loading = true;
        const response = await axios.post(
          "http://127.0.0.1:8000/api/delete_book",
          formData
        );
        toast.showToast("success", response.data.message);
        this.closeModal();
        this.$emit("confirmed-delete", response.data.book);
      } catch (e) {
        console.log(e.response.data);
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
    deleteModalClick(event) {
      console.log("deleteModalClick", event.target.classList.value);
      if (
        event.target.classList.value === "vue-modal" ||
        event.target.classList.value ===
          "vue-modal fade-enter-active fade-enter-to"
      ) {
        this.$emit("close-modal");
      }
    },
  },
  watch: {
    selectedBookDelete(val) {
      if (val) {
        this.values = { ...val };
      }
    },
  },
};
</script>
<template>
  <transition name="fade">
    <div v-show="showDeleteModal" class="vue-modal" @click="deleteModalClick">
      <transition name="drop-in" v-show="showDeleteModal">
        <div class="vue-modal-inner">
          <div class="vue-modal-content">
            <div
              class="d-flex justify-content-between border-bottom border-light p-3"
            >
              <div>
                <h5>Are you sure?</h5>
              </div>
              <div>
                <i class="fa fa-times fa-lg pointer" @click="closeModal"></i>
              </div>
            </div>
            <!-- <div><label>Are you sure?</label></div> -->
            <div class="mt-3" style="text-align-last: end">
              <span v-if="!loading"
                ><button
                  size="sm"
                  class="btn btn-primary"
                  @click="closeModal"
                  :disabled="loading"
                >
                  Cancel
                </button></span
              >&nbsp;&nbsp;
              <button
                size="sm"
                class="btn btn-danger"
                @click="deleteBook"
                :disabled="loading"
              >
                <span v-if="loading">Loading</span>
                <span v-else>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<style scoped>
.vue-modal-content {
  padding-bottom: 1rem;
}
.vue-modal-inner {
  position: sticky;
  top: 35%;
  left: 30%;
}
</style>
