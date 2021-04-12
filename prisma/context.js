const {PrismaClient} = require('@prisma/client');

// import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

const context = {
  prisma: prisma,
};

module.exports = {
  context: context
}