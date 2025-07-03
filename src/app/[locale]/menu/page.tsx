import Menu from "@/components/menu";
import { db } from "@/lib/prisma";
import { getProductsByCategory } from "@/server/db/products"

async function MenuPage() {
    // await db.category.createMany({ 
    //     data:[
    //         {
    //             name: 'Classic Pizzas',
    //             order: 0
    //         },
    //         {
    //             name: 'Specialty Pizzas',
    //             order: 0
    //         },
    //     ]
    // }) pour ajouté aux table categorie 
    const categorites = await getProductsByCategory();
  return (
    <menu>
        {categorites.map((category)=>(
            <section key={category.id} className="section-gap">
                <div className="container text-center">
                    <h1 className="text-primary font-bold text-4xl italic mb-6">
                        {category.name}
                    </h1>
                    <Menu items={category.products} />
                </div>
            </section>
        ))}
    </menu>
  )
}

export default MenuPage