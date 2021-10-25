import express, { Express } from 'express';

export default (app: Express): void => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
};
