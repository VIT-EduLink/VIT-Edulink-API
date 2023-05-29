import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { redis } from '../lib/redis';

const router = Router();
const prisma = new PrismaClient();

// get cse data
router.get('/', async (req: Request, res: Response) => {
    const cachedData = await redis.get('cseData');

    if (cachedData) {
        const cseData = JSON.parse(cachedData);
        return res.json(cseData);
    }

    const cseData = await prisma.cSE.findMany();
    await redis.set('cseData', JSON.stringify(cseData))
    
    res.json(cseData);
});

// add new cse data
router.post('/', async (req: Request, res: Response) => {
    await redis.del('allData');
    await redis.del('cseData');
    const newCse = await prisma.cSE.create({ data: req.body });
    res.json(newCse);
});

// updating cse data
router.put('/:id', async (req: Request, res: Response) => {
    await redis.del('allData');
    await redis.del('cseData');
    const id = req.params.id;
    const newlabel = req.body.label;
    const newlink = req.body.link;
    const updatedUser = await prisma.cSE.update({
        where: {id: id}, 
        data: {
            label: newlabel,
            link: newlink,
        },
    })
    res.json(updatedUser)
})

// delete cse data
router.delete("/:id", async (req: Request, res: Response) => {
    await redis.del('allData');
    await redis.del('cseData');
    const id = req.params.id
    const deleteUser = await prisma.cSE.delete({
        where: { id: id}
    })
    res.json(deleteUser)
})


export default router;
