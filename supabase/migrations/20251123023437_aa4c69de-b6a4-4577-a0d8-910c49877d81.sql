-- Create function to increment user stats
CREATE OR REPLACE FUNCTION public.increment_user_stats(
  user_id UUID,
  points INTEGER
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET 
    bubble_points = COALESCE(bubble_points, 0) + points,
    trash_collected = COALESCE(trash_collected, 0) + 1,
    updated_at = now()
  WHERE id = user_id;
END;
$$;