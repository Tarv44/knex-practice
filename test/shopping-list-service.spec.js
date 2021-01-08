const ShopListService = require('../src/shopping-list-service')
const knex = require('knex')
const { expect } = require('chai')

describe('Shopping List Service Object', function() {
    let db

    let testItems = [
        {
            id: 1,
            name: 'Chocolate',
            price: '3.33',
            category: 'Main',
            checked: false,
            date_added: new Date('2029-01-22T16:28:32.615Z')
        },
        {
            id: 2,
            name: 'Pizza',
            price: '4.69',
            category: 'Lunch',
            checked: true,
            date_added: new Date('2100-05-22T16:28:32.615Z')
        },
        {
            id: 3,
            name: 'Beans',
            price: '1.50',
            category: 'Breakfast',
            checked: false,
            date_added: new Date('1919-12-22T16:28:32.615Z')
        },
    ]

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
    })

    before(() => db('shopping_list').truncate())

    afterEach(() => db('shopping_list').truncate())

    after(() => db.destroy())

    context(`Given 'shopping_list' has data`, () => {
        beforeEach(() => {
            return db
                .into('shopping_list')
                .insert(testItems)
        })

        it(`getAllItems() resolves all items from 'shopping_list' table`, () => {
            return ShopListService.getAllItems(db)
                .then(results => {
                    expect(results).to.eql(testItems)
                })
        })

        it(`getById() resolves an item by id from 'shopping_list' table`, () => {
            const thirdId = 3
            const thirdTestItem = testItems[thirdId-1]
            return ShopListService.getById(db, thirdId)
                .then(actual => {
                    expect(actual).to.eql({
                        id: thirdId,
                        name: thirdTestItem.name,
                        price: thirdTestItem.price,
                        category: thirdTestItem.category,
                        checked: thirdTestItem.checked,
                        date_added: thirdTestItem.date_added
                    })
                })
        })

        it(`deleteItem() removes an item by id from 'shopping_list' table`, () => {
            const itemId = 3
            return ShopListService.deleteListItem(db, itemId)
                .then(() => ShopListService.getAllItems(db))
                .then(allItems => {
                    const expected = testItems.filter(item => item.id !== itemId)
                    expect(allItems).to.eql(expected)
                })
        })

        it(`updateItem() updates an item from the 'shopping_list' table`, () => {
            const itemId = 3
            const newItemData = {
                name: 'Bacon',
                price: '20.50',
                category: 'Lunch',
                checked: true,
                date_added: new Date('1912-12-22T16:28:32.615Z')
            }
            return ShopListService.updateListItem(db, itemId, newItemData)
                .then(() => ShopListService.getById(db, itemId))
                .then(item => {
                    expect(item).to.eql({
                        id: itemId,
                        ...newItemData
                    })
                })
        })
    })

    context(`Given 'shopping_list' has no data`, () => {
        it(`getAllItems() resolves an empty array`, () => {
            return ShopListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
        })

        it(`insertIntoList() inserts a new item and resolves the new item with an 'id'`, () => {
            const newItem = {
                name: 'Chocolate',
                price: '3.33',
                category: 'Main',
                checked: false,
                date_added: new Date('2029-01-22T16:28:32.615Z')
            }
            return ShopListService.insertIntoList(db, newItem)
                .then(actual => {
                    expect(actual).to.eql({
                        id:1,
                        ...newItem
                    })
                })
        })
    })
})