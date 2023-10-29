export interface Database {
  public: {
    Tables: {
      allergens: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      brands: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      foods: {
        Row: {
          brand: number | null
          carbs: number
          fats: number
          id: number
          kilocalories: number
          name: string
          proteins: number
          quantity: number
          unit: string
        }
        Insert: {
          brand?: number | null
          carbs?: number
          fats?: number
          id?: number
          kilocalories: number
          name: string
          proteins?: number
          quantity?: number
          unit: string
        }
        Update: {
          brand?: number | null
          carbs?: number
          fats?: number
          id?: number
          kilocalories?: number
          name?: string
          proteins?: number
          quantity?: number
          unit?: string
        }
        Relationships: [
          {
            foreignKeyName: 'foods_brand_fkey'
            columns: ['brand']
            referencedRelation: 'brands'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
