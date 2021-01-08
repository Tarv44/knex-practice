const ShopListService = {
    getAllItems(knex) {
        return knex
            .select('*')
            .from('shopping_list')
    },
    insertIntoList(knex, item) {
        return knex
            .insert(item)
            .into('shopping_list')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex
            .select('*')
            .from('shopping_list')
            .where('id',id)
            .first()
    },
    deleteListItem(knex, id) {
        return knex('shopping_list')
            .where({ id })
            .delete()
    },
    updateListItem(knex, id, newFields) {
        return knex('shopping_list')
            .where({ id })
            .update(newFields)
    }
}

module.exports = ShopListService