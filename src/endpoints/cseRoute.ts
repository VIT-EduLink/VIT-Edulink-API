import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// get cse data
router.get('/', async (req: Request, res: Response) => {
  const cseData = await prisma.cSE.findMany();
  res.json(cseData);
});

// add new cse data
router.post('/', async (req: Request, res: Response) => {
  const newCse = await prisma.cSE.create({ data: req.body });
  res.json(newCse);
});

// edit cse data
router.put('/:id', async (req: Request, res: Response) => {
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
    const id = req.params.id
    const deleteUser = await prisma.cSE.delete({
        where: { id: id}
    })
    res.json(deleteUser)
})


export default router;
