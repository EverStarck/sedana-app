import { supabase } from "@/lib/supabase";

export type Military = {
  created_at: string;
  desc:       string;
  id:         number;
  name:       string;
  photo:      string;
  range:      string;
  status:     Status;
}

export enum Status {
  Active = "active",
  Reserve = "reserve",
  Retired = "retired",
}


export const fetchMilitaries = async () => {
  const { data, error } = await supabase.from('militaries').select('*');

  if (error) {
    throw error;
  }

  const status = {
    active: [] as Military[],
    reserve: [] as Military[],
    retired: [] as Military[],
  }

  if (!data) {
    return status;
  }

  data.forEach((military: Military) => {
    status[military.status].push(military);
  });

  return status;
};

