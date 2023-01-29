<script lang="ts">
import axios from "axios";
import Book from "@/models/Book";
import EditBookModal from "../components/EditBookModal.vue";
import DeleteBookModal from "@/components/DeleteBookModal.vue";

export default {
  components: { EditBookModal, DeleteBookModal },

  inheritAttrs: false,
  data() {
    return {
      bookList: new Array<Book>(),
      loadingBooks: false,
      apiFailed: false,
      editIcon: "/src/assets/edit.png",
      deleteIcon: "/src/assets/delete.png",
      showEditModal: false,
      selectedBookEdit: null,
      showDeleteModal: false,
      selectedBookDelete: null,
    };
  },
  created() {
    this.getBooks();
  },
  methods: {
    async getBooks() {
      try {
        this.loadingBooks = true;
        const response = await axios.get(
          "http://127.0.0.1:8000/api/get_all_books"
        );
        this.bookList = response.data;
        console.log(response.data);
      } catch (e) {
        console.log(e);
        this.apiFailed = true;
      } finally {
        this.loadingBooks = false;
      }
    },
    closeEditModal() {
      this.showEditModal = !this.showEditModal;
      this.selectedBookEdit = null;
    },
    onConfirmedEdit(data: any) {
      console.log("onConfirmedEdit", data);
      this.bookList = this.bookList.map((e) => {
        return e.id === data.id ? data : e;
      });
    },
    closeDeleteModal() {
      this.showDeleteModal = !this.showDeleteModal;
      this.selectedBookDelete = null;
    },
    onConfirmedDelete(item: any) {
      this.bookList = this.bookList.filter((book) => {
        return book.id !== item.id;
      });
      console.log(this.bookList);
    },
    showModalDialog(data: any, dialog: string) {
      if (dialog === "edit") {
        this.selectedBookEdit = data;
        this.showEditModal = !this.showEditModal;
      } else {
        this.selectedBookDelete = data;
        this.showDeleteModal = !this.showDeleteModal;
      }
    },
    openPdf(pdfUrl: string) {
      window.open(pdfUrl);
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="bodySection">
      <h1>Manage Books</h1>
      <div class="border"></div>
      <div
        v-if="!apiFailed && bookList.length > 0 && !loadingBooks"
        class="bookSection"
      >
        <div
          v-for="(item, index) in bookList"
          :key="index"
          class="card-big-shadow"
        >
          <div
            class="card card-just-text"
            data-background="color"
            data-color="blue"
            data-radius="none"
          >
            <img
              :src="item.image_url"
              style="
                width: 100%;
                object-fit: cover;
                opacity: 0.7;
                min-height: 100%;
              "
              class="bookImage"
            />
            <div class="optionsRead">
              <img src="../assets/read.png" @click="openPdf(item.pdf_url)" />
            </div>
            <div class="optionsMenu">
              <img
                src="../assets/edit.png"
                style="cursor: pointer"
                @click="showModalDialog(item, 'edit')"
              />
              <img
                src="../assets/delete.png"
                style="cursor: pointer"
                @click="showModalDialog(item, 'delete')"
              />
            </div>
            <div class="content">
              <h1 class="category glowText overflowText">{{ item.title }}</h1>
              <!-- <h4 class="title"><a href="#">Blue Card</a></h4> -->
              <p class="description glowText overflowText">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="loadingBooks">LOADING</div>
      <div v-else-if="bookList.length == 0" class="noBooks">
        <p>No books in store</p>
      </div>
      <div v-else>
        <img src="../assets/404.png" />
      </div>
    </div>
  </div>
  <EditBookModal
    :showEditModal="showEditModal"
    :selectedBookEdit="selectedBookEdit"
    @close-modal="closeEditModal"
    @confirmed-edit="onConfirmedEdit"
  />
  <DeleteBookModal
    :showDeleteModal="showDeleteModal"
    :selectedBookDelete="selectedBookDelete"
    @close-modal="closeDeleteModal"
    @confirmed-delete="onConfirmedDelete"
  />
</template>

<style scoped lang="scss">
.wrapper {
  background-color: aliceblue;
}

h1 {
  color: black;
  font-size: 1.5rem;
}
.overflowText {
  overflow: hidden;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.bodySection {
  background-color: white;
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.2rem;
  min-height: 100%;
}

.bookSection {
  padding: 1rem;
  display: grid;
  max-width: 1500px;
  justify-content: center;
  grid-template-columns: repeat(3, 25%);
  column-gap: 5rem;
  row-gap: 50px;
  margin: 0 auto;
}

.noBooks {
  display: flex;
  justify-content: center;
}

.border {
  height: 1px;
  background-color: lightgrey;
  margin: 1rem 0rem;
}

body {
  margin-top: 20px;
}

.card-big-shadow {
  max-width: 300px;
  max-height: 300px;
  min-height: 150px;
  position: relative;
}

.card[data-radius="none"] {
  border-radius: 0px;
}

.card {
  border-radius: 8px;
  box-shadow: 0 2px 2px rgba(204, 197, 185, 0.5);
  background-color: #ffffff;
  color: #252422;
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;

  &:hover {
    transform: scale(1.1);
    z-index: 100;
    transition-duration: 1s;
  }
}

.card[data-background="image"] .title,
.card[data-background="image"] .stats,
.card[data-background="image"] .category,
.card[data-background="image"] .description,
.card[data-background="image"] .content,
.card[data-background="image"] .card-footer,
.card[data-background="image"] small,
.card[data-background="image"] .content a,
.card[data-background="color"] .title,
.card[data-background="color"] .stats,
.card[data-background="color"] .category,
.card[data-background="color"] .description,
.card[data-background="color"] .content,
.card[data-background="color"] .card-footer,
.card[data-background="color"] small,
.card[data-background="color"] .content a {
  color: #ffffff;
}

.card.card-just-text .content {
  position: absolute;
  bottom: 0;
  background-color: #00000082;
  width: 100%;
}

.card .content {
  padding: 2vw 2vh 0px 2vh;
}

.card[data-color="blue"] .category {
  color: #7a9e9f;
}

.card .category,
.card .label {
  font-size: 14px;
  margin-bottom: 0px;
  text-transform: uppercase;
  font-weight: bolder;
}

.card-big-shadow:before {
  background-image: url("http://static.tumblr.com/i21wc39/coTmrkw40/shadow.png");
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  bottom: -12%;
  content: "";
  display: block;
  left: -12%;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 0;
}

.card .description {
  font-size: 16px;
  color: #66615b;
}

a:hover,
a:focus {
  text-decoration: none;
}

.bookImage :hover {
  opacity: 1 !important;
}

.card :hover + .bookImage {
  background: #ccc;
}

/*======== COLORS ===========*/

.glowText {
  color: #fff !important;
  text-shadow: 1px 1px 10px #fff, 1px 1px 100px #ccc;
}

.optionsMenu {
  position: absolute;
  right: 10px;
  top: 10px;
  max-width: 20px;
}
.optionsRead {
  position: absolute;
  left: 10px;
  top: 10px;
  max-width: 50px;
  cursor: pointer;
}
@media only screen and (max-width: 1300px) {
  .bookSection {
    grid-template-columns: repeat(2, 40%);
    column-gap: 2rem;
    row-gap: 50px;
  }
}
@media only screen and (max-width: 900px) {
  .bookSection {
    grid-template-columns: repeat(1, 75%);
    column-gap: 1rem;
    row-gap: 50px;
  }
}
</style>
