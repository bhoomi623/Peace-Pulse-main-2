const mongoose=require ("mongoose")
exports.connectdatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://poojapal:poojapal@peacepulsecluster.p2k2y.mongodb.net/peacepulsedb')
        console.log('database connected successfully')
    } catch (error) {
        console.log('can not connect database',error)
    }
}