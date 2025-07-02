import {useDispatch , useSelector } from'react-redux';
import { AppDispatch, RootState } from './store';

// maintant en assigné les type de notre store (AppDispatch,RootState) aux 2 methode de redux useDispatch,useSelector
// et dans notre component en va utilisé (useAppDispatch useAppSelector)
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
