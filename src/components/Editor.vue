<template>
    <div v-if="editor">
    <button @click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
      bold
    </button>
    <button @click="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
      italic
    </button>
    <button @click="editor.chain().focus().toggleStrike().run()" :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
      strike
    </button>
    <button @click="editor.chain().focus().toggleCode().run()" :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
      code
    </button>
    <button @click="editor.chain().focus().unsetAllMarks().run()">
      clear marks
    </button>
    <button @click="editor.chain().focus().clearNodes().run()">
      clear nodes
    </button>
    <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
      paragraph
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
      h1
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
      h2
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
      h3
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
      h4
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
      h5
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
      h6
    </button>
    <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
      bullet list
    </button>
    <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
      ordered list
    </button>
    <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
      code block
    </button>
    <button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
      blockquote
    </button>
    <button @click="editor.chain().focus().setHorizontalRule().run()">
      horizontal rule
    </button>
    <button @click="editor.chain().focus().setHardBreak().run()">
      hard break
    </button>
    <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
      undo
    </button>
    <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
      redo
    </button>
  </div>
  <editor-content :editor="editor" class="form-control mt-2"/>
  </template>
  
  <script>
  import StarterKit from '@tiptap/starter-kit'
  import { Editor, EditorContent } from '@tiptap/vue-3'
  import Placeholder from '@tiptap/extension-placeholder'
  
  export default {
    components: {
      EditorContent,
    },
  
    props: {
      modelValue: {
        type: String,
        default: '',
      },
    },
  
    emits: ['update:modelValue'],
  
    data() {
      return {
        editor: null,
      }
    },
  
    watch: {
      modelValue(value) {
        // HTML
        const isSame = this.editor.getHTML() === value
  
        // JSON
        // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)
  
        if (isSame) {
          return
        }
  
        this.editor.commands.setContent(value, false)
      },
    },
  
    mounted() {
      this.editor = new Editor({
        extensions: [
          StarterKit,
          Placeholder.configure({
          // Use a placeholder:
          placeholder: 'Write the new post …',
          // Use different placeholders depending on the node type:
          // placeholder: ({ node }) => {
          //   if (node.type.name === 'heading') {
          //     return 'What’s the title?'
          //   }

          //   return 'Can you add some further context?'
          // },
        }),
        ],
        content: this.modelValue,
        onUpdate: () => {
          // HTML
          this.$emit('update:modelValue', this.editor.getHTML())
  
          // JSON
          // this.$emit('update:modelValue', this.editor.getJSON())
        },
      })
    },
  
    beforeUnmount() {
      this.editor.destroy()
    },
  }
  </script>

  <style >
  /* Basic editor styles */
.tiptap > * + * {
  margin-top: 0.75em;
}

.tiptap ul,
.tiptap ol {
  padding: 0 1rem;
}

.tiptap h1, .tiptap h2, .tiptap h3, .tiptap h4, .tiptap h5, .tiptap h6 {
  line-height: 1.1;
}

.tiptap code {
  background-color: rgba(97, 97, 97, 0.1);
  color: #616161;
}

.tiptap pre {
  background: #0D0D0D;
  color: #FFF;
  font-family: 'JetBrainsMono', monospace;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
}

.tiptap pre code {
  color: inherit;
  padding: 0;
  background: none;
  font-size: 0.8rem;
}

.tiptap img {
  max-width: 100%;
  height: auto;
}

.tiptap blockquote {
  padding-left: 1rem;
  border-left: 2px solid rgba(13, 13, 13, 0.1);
}

.tiptap hr {
  border: none;
  border-top: 2px solid rgba(13, 13, 13, 0.1);
  margin: 2rem 0;
}
/* Placeholder (at the top) */
.tiptap p.is-editor-empty:first-child::before {
  content: attr(data-placeholder); /* Use the value of `data-placeholder` attribute as the content */
  float: left;
  color: #adb5bd; /* Light grey color for the placeholder text */
  pointer-events: none; /* Ensures the placeholder doesn't interfere with input */
  height: 0; /* Prevents the placeholder from affecting the layout */
}


.ProseMirror:focus {
  outline: none;
}

button{
    font-size: inherit;
    font-family: inherit;
    color: #000;
    margin: 0.1rem;
    border: 1px solid black;
    border-radius: 0.3rem;
    padding: 0.1rem 0.4rem;
    background: white;
    accent-color: black;
}
.is-active {
    background: black;
    color: #fff;
}

</style>