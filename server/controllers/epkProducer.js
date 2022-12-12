import epkProducer from "../models/epkProducer.js";
import epk from "../models/epk.js";

export const createEpkProducer = async (req, res) => {
    const title = req.body.title;
    const producerList = req.body.producerList;
    const epkFromDb = await epk.findOne({ title: title });

    try {

        const savedProducer = [];
        for (let i = 0; i < producerList.length; i++) {
            console.log(producerList[i]);
            const newProducer = new epkProducer(producerList[i]);
            newProducer.save();

            savedProducer.push(newProducer);
        }
        res.status(201).json(savedProducer);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const getEpkProducer = async (req, res) => {
    const epk = req.params.id;
    try {
        const ProducerFromDb = await epkProducer.find({ epk: epk });
        console.log(ProducerFromDb);
        res.status(200).json(ProducerFromDb);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
