import React, { useCallback, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss'
export default function Login() {
    
    return (
        <div className="border border-primary">
            Login
            <div className="form-container border border-dark">
                <div className="p-5">
                    <form>

                        <div class="form-group">
                            <label for="inputEmail4">Username</label>
                            <input type="email" class="form-control" id="inputEmail4" placeholder="Email"></input>
                        </div>
                        <div class="form-group ">
                            <label for="inputPassword4">Password</label>
                            <input type="password" class="form-control" id="inputPassword4" placeholder="Password"></input>
                        </div>


                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="gridCheck"></input>
                                <label class="form-check-label" for="gridCheck">
                                    Keep me sign in
      </label>
                            </div>
                        </div>
                            <div class="d-flex justify-content-center">
                            <button type="submit" class="btn btn-primary">Sign in</button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
