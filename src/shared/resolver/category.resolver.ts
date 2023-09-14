import { Injectable, inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';

export const CategoryResolver: ResolveFn<any[]> = (route, state, api: ApiService = inject(ApiService)) => {
  return api.getCate();
};
