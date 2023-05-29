import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { redis } from '../lib/redis';

const router = Router();
const prisma = new PrismaClient();

// get chemistry data 
router.get('/', async (req: Request, res: Response) => {
    const cachedData = await redis.get('chemData');
    
    if (cachedData) {
        const chemData = JSON.parse(cachedData);
        return res.json(chemData);
    }
    
    const chemData = await prisma.chemistry.findMany();
    await redis.set('chemData', JSON.stringify(chemData))

    res.json(chemData);
});

// add new chemistry data
router.post('/', async (req: Request, res: Response) => {
    await redis.del('allData');
    await redis.del('chemData');
    const newChem = await prisma.chemistry.create({ data: req.body });
    res.json(newChem);
});

// updating chemistry data
router.put('/:id', async (req: Request, res: Response) => {
    await redis.del('allData');
    await redis.del('chemData');
    const id = req.params.id;
    const newlabel = req.body.label;
    const newlink = req.body.link;
    const updatedUser = await prisma.chemistry.update({
        where: {id: id}, 
        data: {
            label: newlabel,
            link: newlink,
        },
    })
    res.json(updatedUser)
})

// delete chemistry data
router.delete("/:id", async (req: Request, res: Response) => {
    await redis.del('allData');
    await redis.del('chemData');
    const id = req.params.id
    const deleteUser = await prisma.chemistry.delete({
        where: { id: id}
    })
    res.json(deleteUser)
})

export default router;
