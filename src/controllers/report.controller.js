import Check from "../models/report.model.js";

export const createReport = async (req, res) => {
  const { namehorse, medicines, specifications, food, horseshoes, job } =
    req.body;
  try {
    const newReport = new Check({
      namehorse,
      medicines,
      specifications,
      food,
      horseshoes,
      job,
    });

    const reportSaved = await newReport.save();

    res.json({
      id: reportSaved._id,
      name: reportSaved.name,
      medicines: reportSaved.medicines,
      createdAt: reportSaved.createdAt,
      updatedAt: reportSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const report = await Check.findByIdAndDelete(req.params.id);

    if (!report)
      return res.status(404).json({ message: "Reporte no encontrado" });

    return res.status(200).json({ message: "Eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReport = async (req, res) => {
  try {
    const report = await Check.findById(req.params.id);

    if (!report)
      return res.status(404).json({ message: "Reporte no encontrado" });

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await Check.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReport = async (req, res) => {
  try {
    const updatedReport = { ...req.body };

    const report = await Check.findByIdAndUpdate(req.params.id, updatedReport, {
      new: true,
    });

    if (!report)
      return res.status(404).json({ message: "Reporte no encontrado" });

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
