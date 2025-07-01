"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { formatCurrency } from "@/lib/formatCurrency";
import { Checkbox } from "../ui/checkbox";
import { Extra, Size } from "@/generated/prisma";
import { ProductWithRelations } from "@/types/product";

function AddToCartButton({item}:{item:ProductWithRelations}) {

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            type="button"
            size="lg"
            className="mt-4 text-white rounded-full !px-8"
          >
            <span>Add TO Cart</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-auto">
          <DialogHeader className="flex items-center">
            <Image src={item.image} alt={item.name} width={200} height={200} />
            <DialogTitle >{item.name}</DialogTitle>
            <DialogDescription className="text-center">
              {item.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-10">
            <div className='space-y-4 text-center'>
              <Label htmlFor='pick-size'>Pick your size</Label>
              <PickSize sizes={item.sizes} item={item}/>
            </div>
          <div className='space-y-4 text-center'>
            <Label htmlFor='add-extras'>Any extras?</Label>
              <Extras extras={item.extras} />
            </div>  
          </div>
          <DialogFooter>
            <Button type="submit"  className='w-full h-10'>Add to cart </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default AddToCartButton



 function PickSize({sizes,item}:{sizes:Size[],item:ProductWithRelations}) {
  return (
    <RadioGroup defaultValue="comfortable">
      {sizes.map((size:any) => (
        <div key={size.id} className="flex items-center  space-x-2 border border-gray-100 rounded-md p-4">
          <RadioGroupItem value="default" id={size.id} />
          <Label htmlFor={size.id}> {size.name}{formatCurrency(size.price + item.basePrice)}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}

 function Extras({ extras }: { extras: Extra[]}) {
   return extras.map((extra: any) => (
     <div key={extra.id} className="flex items-center space-x-2 border border-gray-100 rounded-md p-4">
       <div className="flex items-center gap-3">
         <Checkbox id={extra.id} />
         <Label htmlFor={extra.id}
          className='text-sm text-accent font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
          {extra.name} {formatCurrency(extra.price)}
          </Label>
       </div>
     </div>
   ));
 }

