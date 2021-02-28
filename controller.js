import * as uuid from 'uuid';
import path from 'path';

import Post from './Post.js'

export const create = async (req, res) => {
  try {
    const { img } = req.files;
    const { title, text } = req.body;

    const fileNameArr = img.name.split('.');
    const ext = fileNameArr[fileNameArr.length - 1];

    const fileName = uuid.v4() + '.' + ext;
    const filePath = path.resolve('static', fileName);

    img.mv(filePath);

    const post = new Post({
      title,
      text,
      img: fileName
    })

    await post.save();
    res.json(post);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Серверная ошибка' });
  }
}