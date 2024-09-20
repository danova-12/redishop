import {Form,FormField, FormControl, FormLabel, FormMessage, FormDescription, FormItem} from "@/components/ui/form"
import {useForm, submitHandler} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod";
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"
import {db} from "@/config/firebase"
import {getDocs, collection, addDoc} from "firebase/firestore"
import {ref,uploadBytes} from "firebase/storage"
import {storage} from "@/config/firebase"
import { getDownloadURL } from 'firebase/storage';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
//import {}
const FormSchema = z.object({
    title: z.string().min(5,{message:"enter at least 5 characters"}),
    price :z.string(),
    description:z.string().min(20,{message:"enter at least 20 letters"}),
    image: z
    .instanceof(File)
    .refine((file)=> file.size < 5 * 1024 * 1024, { // Limit size to 5 MB
      message: "File size must be less than 5 MB.",
    })
    .refine((file) => {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      return validTypes.includes(file.type);
    }, {
      message: "You must upload a valid image file (JPEG, PNG, GIF).",
    }),

})

export default function AddProduct()
{
 const [upload, setUpload] = useState(false)
 const form = useForm<z.infer<typeof FormSchema>>({
   resolver:zodResolver(FormSchema)


})
const productRef = collection(db,"products")
const navigate = useNavigate()
async function onSubmit({title,price,description,image}:z.infer<typeof FormSchema>){
  setUpload(true);
  const fileFolder = ref(storage, `cloths/${image.name}`);
  await uploadBytes(fileFolder, image);
  const imageUrl = await getDownloadURL(fileFolder);
  

    // Add document to Firestore (uncomment when ready)
  await addDoc(productRef, { title, price, description, image: imageUrl});
  //await addDoc(productRef,{title,price,description,image})
 setUpload(false)
   navigate("/")
}



return(
 <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8">
        <FormField 
         control={form.control}
         name="title"
         render ={({field})=>(
         <FormItem>
            <FormLabel className="font-bold uppercase text-black">title </FormLabel>
            <FormControl>
              <Input placeholder="title" {...field}  />
            </FormControl>
            <FormMessage />

        </FormItem>

         )}
        />
        <FormField 
         control={form.control}
         name="price"
         render ={({field})=>(
         <FormItem>
            <FormLabel className="font-bold text-black uppercase">price </FormLabel>
            <FormControl>
              <Input placeholder="price" {...field}  />
            </FormControl>
            <FormMessage />

        </FormItem>



         )

         }
        
        />
        <FormField 
         control={form.control}
         name="description"
         render ={({field})=>(
         <FormItem>
            <FormLabel className="font-bold uppercase text-black">description </FormLabel>
            <FormControl>
              <Textarea  {...field} placeholder="description" />
            </FormControl>
            <FormMessage />

        </FormItem>

         )

         }
        
        />
        <FormField 
         control={form.control}
         name="image"
         render ={({field})=>(
         <FormItem>
            <FormLabel className="font-bold uppercase text-black">image </FormLabel>
            <FormControl>
            <Input type="file" accept="image/*" onChange={(e) => {
                  if (e.target.files){
                    field.onChange(e.target.files[0]);
                     // Set the first file
                  }

                }} 
                />

            </FormControl>
            <FormMessage />

        </FormItem>
         )

         }
        
        />
       <Button type="submit" className="w-full font-bold">
       {upload? <span>uploading....</span>:"upload"} 
        </Button>

     </form>

 </Form>
)

}