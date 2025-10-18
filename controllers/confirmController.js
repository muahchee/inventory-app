import dotenv from "dotenv";
import { validationResult, body, matchedData } from "express-validator";

dotenv.config();

const validatePw = [
  body("pw").custom(async (value) => {
    if (value !== process.env.PW) {
      throw new Error("Wrong Password! ACCESS DENIED!!");
    }
  }),
];

export async function checkPasswordGet(req, res) {
  res.render("confirm", {
    title: "Password Check",
    id: req.params.id,
    action: req.params.action,
  });
}

export const checkPasswordPost = [
  validatePw,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("confirm", {
        title: "Password Check",
        id: req.params.id,
        action: req.params.action,
        errors: errors.array(),
      });
    }
    if (req.params.action === "deleting") {
      res.redirect(`/${req.params.id}/delete`);
    } else if (req.params.action === "updating") {
      res.redirect(`/${req.params.id}/update`);
    }
  },
];
