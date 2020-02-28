const Sequelize = require('sequelize')
const Model = Sequelize.Model
class Customer extends Model {}
Customer.init({
  name: Sequelize.STRING,
  name_other: Sequelize.STRING
},
{
  sequelize,
  modelName: 'customer'
})

module.export.db = {
  getCustomer: Customer.findOne({ where: {  } })
}