export default {
    page404: (req, res, next)=>{
        res.status(404).render('page404');
    }
}