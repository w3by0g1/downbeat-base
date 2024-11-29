declare module "./framerVariants" {
    import { Variants } from "framer-motion";
    export const container: Variants;
    export const item: Variants;
  }
  
  declare module "./firebase.jsx" {
    import { Firestore } from "firebase/firestore";
    export const db: Firestore;
  }
  