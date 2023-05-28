import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// get chemistry data 
router.get('/', async (req: Request, res: Response) => {
  const chemData = await prisma.chemistry.findMany();
  res.json(chemData);
});

// add new chemistry data
router.post('/', async (req: Request, res: Response) => {
  const newChem = await prisma.chemistry.create({ data: req.body });
  res.json(newChem);
});

// edit chemistry data
router.put('/:id', async (req: Request, res: Response) => {
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
    const id = req.params.id
    const deleteUser = await prisma.chemistry.delete({
        where: { id: id}
    })
    res.json(deleteUser)
})

export default router;
