let confessions = [];
let confessionIdCounter = 0;

const VALID_CATEGORIES = ["bug", "deadline", "imposter", "vibe-code"];

function validateConfessionInput(confessionData) {
  if (!confessionData || !confessionData.text) {
    return { valid: false, message: "Text is required" };
  }

  if (confessionData.text.length >= 500) {
    return { valid: false, message: "Text must be less than 500 characters" };
  }

  if (!VALID_CATEGORIES.includes(confessionData.category)) {
    return { valid: false, message: "Invalid category" };
  }

  return { valid: true };
}

exports.createConfession = (req, res) => {
  const confessionData = req.body;
  const validation = validateConfessionInput(confessionData);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.message });
  }

  const newConfession = {
    id: ++confessionIdCounter,
    text: confessionData.text,
    category: confessionData.category,
    created_at: new Date()
  };

  confessions.push(newConfession);

  return res.status(201).json(newConfession);
};

exports.getAllConfessions = (req, res) => {
  const sortedConfessions = [...confessions].sort(
    (a, b) => b.created_at - a.created_at
  );

  return res.json({
    data: sortedConfessions,
    count: sortedConfessions.length
  });
};

exports.getSingleConfession = (req, res) => {
  const confessionId = parseInt(req.params.id);

  const foundConfession = confessions.find(
    confession => confession.id === confessionId
  );

  if (!foundConfession) {
    return res.status(404).json({ message: "Confession not found" });
  }

  return res.json(foundConfession);
};

exports.getConfessionsByCategory = (req, res) => {
  const selectedCategory = req.params.cat;

  if (!VALID_CATEGORIES.includes(selectedCategory)) {
    return res.status(400).json({ message: "Invalid category" });
  }

  const filteredConfessions = confessions.filter(
    confession => confession.category === selectedCategory
  );

  return res.json(filteredConfessions);
};

exports.deleteConfession = (req, res) => {
  const deleteToken = req.headers["x-delete-token"];

  if (deleteToken !== "supersecret123") {
    return res.status(403).json({ message: "No permission" });
  }

  const confessionId = parseInt(req.params.id);

  const confessionIndex = confessions.findIndex(
    confession => confession.id === confessionId
  );

  if (confessionIndex === -1) {
    return res.status(404).json({ message: "Confession not found" });
  }

  const deletedConfession = confessions.splice(confessionIndex, 1);

  return res.json({
    message: "Deleted successfully",
    item: deletedConfession[0]
  });
};