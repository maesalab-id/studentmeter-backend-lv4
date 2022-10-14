module.exports = () => {
  return async function document(req, res, next) {
    const { id } = req.params;
    const document = await models.Submission.findByPk(id);
    if (!document) throw new NotFoundError('Dokumen tidak ditemukan');


    const sp = document.filename.split('.');
    const ext = sp[sp.length - 1];
    const tempDir = path.resolve(app.get('ROOT_DIR'), 'temp');
    const name = document.name.split('.')[0] + '_' + (new Date()).getTime() + '.' + ext;
    const tempFile = path.resolve(tempDir, name);
    fs.writeFileSync(tempFile, document.file);

    res.download(tempFile, () => {
      fs.unlinkSync(tempFile);
    });
  };
};
