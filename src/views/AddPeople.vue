<template>
  <div>
    <md-field>
      <label for>Jméno</label>
      <md-input v-model="person.name"></md-input>
    </md-field>
    <md-field>
      <label for>E-mail</label>
      <md-input v-model="person.email"></md-input>
    </md-field>
    <md-field>
      <md-file v-model="person.image" accept="image/*" id="imageUpload"></md-file>
    </md-field>
      <md-progress-bar md-mode="determinate" :md-value="amount" max=100 id="progressBar"></md-progress-bar>
    <md-button style="margin-top: 50px" class="md-rasied md-accent" @click.prevent="writePerson()">Přidat člověka.</md-button>
  </div>
</template>

<script>
import { storage, store } from "../store.js";

export default {
  name: "AddPeople",
  data() {
    return {
      person: { name: "", email: "", image: "", image_url: "" },
      amount: 0
    };
  },
  mounted: function() {
    var imageUpload = document.getElementById("imageUpload");
    var progressBar = document.getElementById("progressBar");

    var that = this;
    imageUpload.addEventListener("change", function(e) {
      // File
      console.log("hahaha" + this.image);
      var file = e.target.files[0];
      var storageRef = storage.ref("people_images/");

      // Create the file metadata
      var metadata = {
        contentType: "image/jpeg"
      };

      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef.child(file.name).put(file, metadata);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed", // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progressBar.value = progress;
            that.amount = progress;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused": // or 'paused'
              console.log("Upload is paused");
              break;
            case "running": // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        function(error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;

            case "storage/canceled":
              // User canceled the upload
              break;

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        function() {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log("File available at", downloadURL);
            that.person.image_url = downloadURL;
          });
        }
      );
    });
  },
  methods: {
    writePerson: function() {
      var that = this;
      store.addPerson(this.person).then(function() {
        console.log("Osoba úspěšně pridána.");
        that.$router.push({name: "People"});
      });
    }
  }
};
</script>