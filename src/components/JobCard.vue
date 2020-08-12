<template>
  <div>
    <b-col>
      <b-card
        :title="name"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="job-info"
        img-top
        tag="article"
        style="max-width:20rem"
        class="mb-2"
        footer="Card footer"
      >
        <b-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, suscipit distinctio magnam qui animi sequi ex ullam pariatur nemo reiciendis. Cumque eos quo quam qui nam? Harum eaque earum dolores.</b-card-text>
        <b-button v-b-modal="modalId" variant="primary" v-b-tooltip.hover title="Apply here">Apply</b-button>
        <b-modal :id="modalId" title="Apply here info">
          <p class="my-4">Hello from model</p>
        </b-modal>
      </b-card>
    </b-col>
  </div>
</template>

<script>
export default {
  //Added by Srinivas
  props: ["name", "id"],
  computed: {
    modalId(){
      return `modal-${this.id}`
    }
  }
};
</script>

<style>
</style>