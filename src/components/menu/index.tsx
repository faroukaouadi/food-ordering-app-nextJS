import React from 'react'
import MenuItem from './MenuItem'
import { ProductWithRelations } from '@/types/product';

function Menu({items}:{items:ProductWithRelations[]}) {
  return items.length> 0 ?  (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item: any) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  ):(
    <p className='text-accent text-center'>no products found</p>
  )
}

export default Menu