import { Request, Response } from 'express';

export const mockReq = (body = {}, params = {}) => ({
  body,
  params,
} as Request);

export const mockRes = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export const mockNext = jest.fn();