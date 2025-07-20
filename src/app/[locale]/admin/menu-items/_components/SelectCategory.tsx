"use client"

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Languages } from "@/constants/enums";
import { Category } from "@/generated/prisma";
import { Translations } from "@/types/translations";
import { useParams } from "next/navigation";

 function SelectCategory({
    categoryId,
    categories,
    setCategoryId,
    translations
    }:{
    categoryId:string;
    categories:Category[];
    translations:Translations;
    setCategoryId: React.Dispatch<React.SetStateAction<string>>;
      
    }) {
const currentItem = categories.find((item)=>item.id === categoryId)        
const {locale} = useParams();
  return (
    <>
    <Label htmlFor="categoryId" className="capitalize text-black block mb-3">{translations.category}</Label>  
      <Select name="categoryId" onValueChange={(value)=>{
        setCategoryId(value);
        
      }} defaultValue={categoryId}>
      <SelectTrigger className={`w-48 h-10 bg-gray-100 border-none mb-4 focus:ring-0 ${
        locale === Languages.ARABIC ? "flex-row-reverse" : "flex-row"
      }`}>
        <SelectValue>
            {currentItem?.name}
        </SelectValue>

      </SelectTrigger>
      <SelectContent className="bg-transparent border-non z-50">
        <SelectGroup className="bg-background text-accent z-50">
            {categories.map((category)=> (
                <SelectItem 
                key={category.id}
                value={category.id}
                className="hover:!bg-primary hover:!text-white !text-accent !bg-transparent">
                {category.name}
                </SelectItem>      
            ))}
          
        </SelectGroup>
      </SelectContent>
    </Select>
    </>

  )
};
export default SelectCategory;
