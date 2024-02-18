<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Owner extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable, SoftDeletes;
  protected $table = 'owners';

  public function magazins()
  {
      return $this->hasMany(magazin::class,'owner_id');
  }
  protected $appends = ['role'];

  public function getRoleAttribute()
  {
      return 'owner';
  }
  protected $fillable = [
    'firstname',
    'lastname',
    'date_of_birth',
    'last_login_date',
    'gender',
    'cin',
    'phone',
    'email',
    'password',
  ];
  protected $hidden = [
    'password',
    'email_verified_at',
    'last_login_date',
    'deleted_at',
    'remember_token',
    'created_at',
  ];
}
