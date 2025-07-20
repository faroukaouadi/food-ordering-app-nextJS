import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Extra, ExtraIngredients, ProductSizes, Size } from "@/generated/prisma";
import { Translations } from "@/types/translations"
import { Plus, Trash2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Languages } from "@/constants/enums";
import { useParams } from "next/navigation";
import React from "react";

export enum ItemOptionsKeys {
  SIZES,
  EXTRAS,
}
const sizesNames = [
    ProductSizes.SMALL,
    ProductSizes.MEDIUM,
    ProductSizes.LARGE,
];
const extrasNames = [
    ExtraIngredients.BACON,
    ExtraIngredients.CHEESE,
    ExtraIngredients.ONION,
    ExtraIngredients.PEPPER,
    ExtraIngredients.TOMATO,
];
function handleOptions (setState:React.Dispatch<React.SetStateAction<Partial<Size>[]>> | React.Dispatch<React.SetStateAction<Partial<Extra>[]>> ){
     const addOption = () => {
        setState((prev:any)=>{
            return [...prev,{name:"",price:0}];
        });
    };
    const onChange = (e:React.ChangeEvent<HTMLInputElement>,index:number,fieldName:string) => {
        const  newValue = e.target.value;
        setState((prev:any)=>{
            const newSizes = [...prev];
            newSizes[index][fieldName] = newValue;
            return newSizes;
        });  
    };
    const removeOptions = (indexToRemove:number) => {
        setState( (prev:any) =>{
           return prev.filter((_:any,index:number)=> index !== indexToRemove)
        });
    };
    return{addOption,onChange,removeOptions}
};



function ItemOptions({
    translations,
    state,
    setState,
    optionKey,
}:{
    translations:Translations;
    state:Partial<Size>[] | Partial<Extra>[];
    setState:React.Dispatch<React.SetStateAction<Partial<Size>[]>> | React.Dispatch<React.SetStateAction<Partial<Extra>[]>> ;
    optionKey: ItemOptionsKeys;
}) {
   const {addOption,onChange,removeOptions} = handleOptions(setState);
   const isThereAvailableOptions = () =>{
 switch (optionKey){
  case ItemOptionsKeys.SIZES:
    return sizesNames.length > state.length;
  case ItemOptionsKeys.EXTRAS:
    return extrasNames.length > state.length;  
 }
} 
  return (
    <>
      {state.length > 0 && (
        <ul>
          {state.map((item, index) => {
            return (
              <li key={index} className="flex gap-2 mb-2">
                <div className="space-y-1 basis-1/2">
                  <Label>name</Label>
                  <SelectName
                    item={item}
                    onChange={onChange}
                    index={index}
                    currentState={state}
                    optionKey={optionKey}
                  />
                </div>
                <div className="space-y-1 basis-1/2">
                  <Label>Extra Price</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    min={0}
                    name="price"
                    value={item.price}
                    onChange={(e) => onChange(e, index, "price")}
                    className="bg-white focus:!ring-0"
                  />
                </div>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeOptions(index)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {isThereAvailableOptions() && (
        <Button
          type="button"
          variant={"outline"}
          className="w-full"
          onClick={addOption}
        >
          <Plus />
          {optionKey === ItemOptionsKeys.SIZES
            ? translations.admin["menu-items"].addItemSize
            : translations.admin["menu-items"].addExtraItem}
        </Button>
      )}
    </>
  );
}

export default ItemOptions ;

const SelectName = ({
  onChange,
  index,
  item,
  currentState,
  optionKey,
}: {
  onChange: (e: any, index: any, fieldName: any) => void;
  index: number;
  item: Partial<Size> | Partial<Extra>;
  currentState: Partial<Size>[] | Partial<Extra>[];
  optionKey:ItemOptionsKeys;
}) => {
  const { locale } = useParams();
  const getNames = () => {
    switch (optionKey) {
      case ItemOptionsKeys.SIZES:
        const filteredSizes = sizesNames.filter(
          (size) => !currentState.some((s) => s.name === size)
        );

        return filteredSizes;
      case ItemOptionsKeys.EXTRAS:
        const filteredExtras = extrasNames.filter(
          (extra) => !currentState.some((e) => e.name === extra)
        );

        return filteredExtras;
    }
   
  };
  const names = getNames();

  return (
    <Select
      onValueChange={(value) => {
        onChange({ target: { value } }, index, "name");
      }}
      defaultValue={item.name ? item.name : "select ..."}
    >
      <SelectTrigger
        className={`bg-white border-none mb-4 focus:ring-0
        ${locale === Languages.ARABIC ? "flex-row-reverse" : "flex-row"}`}
      >
        <SelectValue>{item.name ? item.name : "select ..."}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="bg-background text-accent z50">
          {names.map((name, index) => (
            <SelectItem
              key={index}
              value={name}
              className="hover:!bg-primary hover:!text-white !text-accent !bg-transparent"
            >
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};