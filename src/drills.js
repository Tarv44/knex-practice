require('dotenv').config()
const ShopListService = require('./shopping-list-service')
const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

console.log('knex and driver installed correctly');

function searchByName(searchTerm) {
    knexInstance
        .select('id', 'name', 'price', 'category')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
}

// searchByName('fish')

function paginateList(pageNumber) {
    const productsPerPage = 6
    const offset = productsPerPage * (pageNumber -1)
    knexInstance
        .select('id', 'name', 'price', 'category')
        .from('shopping_list')
        .limit(productsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}

// paginateList(2)

function getItemsAfterDaysAgo(daysAgo) {
    knexInstance
        .select('id', 'name', 'price', 'category')
        .from('shopping_list')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .then(result => {
            console.log(result)
        })
}

// getItemsAfterDaysAgo(2)

function getCostByCategory() {
    knexInstance
        .select('category')
        .sum('price as total')
        .from('shopping_list')
        .groupBy('category')
        .then(result => {
            console.log(result)
        })
}

/* ------- Shopping List Services ---------- */

ShopListService.getAllItems(knexInstance)
    .then(results => {
        console.log(results)
    })
    .then(() =>
        ShopListService.insertIntoList(knexInstance, {
            name: 'Chocolate',
            price: 40.44, 
            category: 'Snack', 
            checked: true, 
            date_added: new Date('1919-12-22T16:28:32.615Z')
        })
    )
    .then(newItem => {
        console.log(newItem)
        return ShopListService.updateListItem(
            knexInstance, 
            newItem.id, 
            { name: 'New Food' }
        ).then(() => ShopListService.getById(knexInstance, newItem.id))
    })
    .then(updatedItem => {
        console.log(updatedItem)
        return ShopListService.deleteListItem(knexInstance, updatedItem.id)
    })

// getCostByCategory()