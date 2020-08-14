<template>
    <div>
        <md-field>
            <label>Text</label>
            <md-textarea v-model="letter.text" autogrow></md-textarea>
        </md-field>
        <md-field style="width: 200px">
            <label>Podpis</label>
            <md-input v-model="letter.signature"></md-input>
        </md-field>
        <md-button class="md-raised md-accent" @click.prevent="$emit('write', letter)" >Odeslat.</md-button>
    </div>
</template>

<script>

export default {
    name: "MargaritaForm",   
    data() {
        return {
            letter: {
                text: "", 
                signature: ""
            }
        }
    }
}
</script>