import { Injectable, inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';

export const AmountResolver: ResolveFn<any[]> = (route, state, api: ApiService = inject(ApiService)) => {
  return api.getAmount();
};
